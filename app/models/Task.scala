package models

/**
  * Created by volkov97 on 25.9.16.
  */
case class Task(id: Long, team_id: Long, creator_id: Long, performer_id: Long, text: String, deadline: String, status: Long, points: Long)