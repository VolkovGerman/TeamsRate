package controllers

import javax.inject._

import models.{Task, Team, User}
import dao.{MemberDAO, TaskDAO, UserDAO}
import play.api.i18n.{I18nSupport, Lang, Messages, MessagesApi}
import javax.inject.Inject

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.Action
import play.api.mvc.Controller
import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.Future


/**
  * Created by volkov97 on 24.9.16.
  */

@Singleton
class UserController @Inject() (userDAO: UserDAO, memberDAO: MemberDAO, taskDAO: TaskDAO) (val messagesApi: MessagesApi)
  extends Controller with I18nSupport {

  // JSON Results
  val resOk = Json.obj("status" -> "ok")
  val resError = Json.obj("status" -> "error")

  implicit val userWrites: Writes[User] = (
    (JsPath \ "id").write[Long] and
    (JsPath \ "name").write[String] and
    (JsPath \ "surname").write[String] and
    (JsPath \ "vk_id").write[String]
  ) (unlift(User.unapply))

  implicit val userReads: Reads[User] = (
    (JsPath \ "id").read[Long] and
    (JsPath \ "name").read[String] and
    (JsPath \ "surname").read[String] and
    (JsPath \ "vk_id").read[String]
  )(User.apply _)

  implicit val teamWrites: Writes[Team] = (
    (JsPath \ "id").write[Long] and
    (JsPath \ "name").write[String] and
    (JsPath \ "descr").write[String] and
    (JsPath \ "creator_id").write[Long]
  ) (unlift(Team.unapply))

  implicit val teamReads: Reads[Team] = (
    (JsPath \ "id").read[Long] and
    (JsPath \ "name").read[String] and
    (JsPath \ "descr").read[String] and
    (JsPath \ "creator_id").read[Long]
  )(Team.apply _)

  implicit val taskWrites: Writes[Task] = (
    (JsPath \ "id").write[Long] and
    (JsPath \ "team_id").write[Long] and
    (JsPath \ "creator_id").write[Long] and
    (JsPath \ "performer_id").write[Long] and
    (JsPath \ "text").write[String] and
    (JsPath \ "deadline").write[String] and
    (JsPath \ "status").write[Long] and
    (JsPath \ "points").write[Long]
  ) (unlift(Task.unapply))

  implicit val taskReads: Reads[Task] = (
    (JsPath \ "id").read[Long] and
    (JsPath \ "team_id").read[Long] and
    (JsPath \ "creator_id").read[Long] and
    (JsPath \ "performer_id").read[Long] and
    (JsPath \ "text").read[String] and
    (JsPath \ "deadline").read[String] and
    (JsPath \ "status").read[Long] and
    (JsPath \ "points").read[Long]
  )(Task.apply _)

  // REST

  // GET /users
  def getAll = Action.async {
    userDAO.getAll().map(users => Ok(Json.toJson(users)))
  }

  // GET /users/:id
  def get(id: Long) = Action.async {
    userDAO.findById(id).map { user => Ok(Json.toJson(user)) }
  }

  // GET /users/:id/teams
  def getTeams(id: Long) = Action.async {
    memberDAO.getTeamsForUser(id).map { teams => Ok(Json.toJson(teams)) }
  }

  // GET /users/:id/tasks
  def getTasks(id: Long) = Action.async {
    taskDAO.getUserTasks(id).map { tasks => Ok(Json.toJson(tasks)) }
  }

  // POST /users
  def add = Action.async(parse.json) {
    implicit request => request.body.validate[User] match {
      case s: JsSuccess[User] => userDAO.insertIfNotExists(s.get)
        .map(userID => Ok(Json.obj("status" -> "ok", "id" -> userID)))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // PUT /user/:id
  def update(id: Long) = Action.async(parse.json) {
    implicit request => request.body.validate[User] match {
      case s: JsSuccess[User] => userDAO.update(id, s.get).map(_ => Ok(resOk))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // DELETE /user/:id
  def delete(id: Long) = Action.async {
      userDAO.delete(id).map(_ => Ok(resOk))
  }
}