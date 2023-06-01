const knex = require('../database')

class NotesController{
  async create(req, res){
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

      const [note_id] = await knex('movieNotes').insert({
        title,
        description,
        rating,
        user_id
      })
  
      const tagsInsert = tags.map(name =>{
        return{
          note_id,
          user_id,
          name
        }
      })
  
      await knex('movieTags').insert(tagsInsert)
  
      return res.json()
  }
  
  async show(req, res) {
    const { id } = req.params
    const note = await knex('movieNotes')
    .where({id})
    .first()

    const tags = await knex.select('name')
    .from('movieTags')
    .where({note_id: id})

    res.json({
      note,
      tags
     })

    return res.json()
  }

  async delete(req, res){
    const { id } = req.params;
  
      await knex('movieNotes').where({ id }).delete();
      res.json();
  
  }

  async index(req, res) {
    const { user_id, title, tags } = req.query;
  
    let queryNotes = knex.select(
      'movieNotes.id',
      'movieNotes.title',
      'movieNotes.description',
      'movieNotes.rating',
      'movieNotes.user_id'
    )
    .from('movieNotes')
    .where('movieNotes.user_id', user_id);
    try{
      if(title && !tags){
        queryNotes.whereLike('movieNotes.title', `%${title}%`);
  
      } else if (!title && tags){
        const filterTags = tags.split(',').map(tag => tag.trim());
        queryNotes
        .innerJoin('movieTags', 'movieNotes.id', 'movieTags.note_id')
        .whereIn('movieTags.name', filterTags)
  
      } else if (title && tags) {
        const filterTags = tags.split(',').map(tag => tag.trim());
        queryNotes
        .innerJoin('movieTags', 'movieNotes.id', 'movieTags.note_id')
        .whereIn('movieTags.name', filterTags)
        .whereLike('movieNotes.title', `%${title}%`);
      }
      
    
      const notes = await queryNotes;
    
      const userTags = await knex('movieTags').where({ user_id });
    
      const notesWithTags = notes.map((note) => {
        const noteTags = userTags.filter((tag) => tag.note_id === note.id);
        return {
          note,
          tags: noteTags,
        };
      });
    
      return res.json(notesWithTags);
    } catch(err){
      console.error(err)
    }
    
    
  }
}

module.exports = NotesController