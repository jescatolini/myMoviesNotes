const knex = require('../database')

class TagsController {
  async index(req, res){
    const { user_id } = req.params

    const tags = await knex('movieTags')
    .where({ user_id })

    return res.json(tags)
  }
}

module.exports = TagsController