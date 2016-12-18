package controllers

import javax.inject.{Inject, Singleton}

import dao.{MemberDAO, TaskDAO, TeamDAO}
import models.{Member, Task, Team, User}
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

import scala.concurrent._
import ExecutionContext.Implicits.global

/**
  * Created by volkov97 on 24.9.16.
  */
@Singleton
class TeamController @Inject() (teamDAO: TeamDAO, memberDAO: MemberDAO, taskDAO: TaskDAO) (val messagesApi: MessagesApi)
  extends Controller with I18nSupport {

  // JSON Results
  val resOk = Json.obj("status" -> "ok")
  val resError = Json.obj("status" -> "error")

  implicit val userWrites: Writes[User] = (
    (JsPath \ "id").write[Long] and
    (JsPath \ "name").write[String] and
    (JsPath \ "surname").write[String] and
    (JsPath \ "photo_url").write[String] and
    (JsPath \ "gp_id").write[String]
  ) (unlift(User.unapply))

  implicit val userReads: Reads[User] = (
    (JsPath \ "id").read[Long] and
    (JsPath \ "name").read[String] and
    (JsPath \ "surname").read[String] and
    (JsPath \ "photo_url").read[String] and
    (JsPath \ "gp_id").read[String]
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
    (JsPath \ "user_id").read[Long] and
    (JsPath \ "performer_id").read[Long] and
    (JsPath \ "text").read[String] and
    (JsPath \ "deadline").read[String] and
    (JsPath \ "status").read[Long] and
    (JsPath \ "points").read[Long]
  ) (Task.apply _)

  implicit val memberWrites: Writes[Member] = (
    (JsPath \ "id").write[Long] and
    (JsPath \ "user_id").write[Long] and
    (JsPath \ "team_id").write[Long]
  ) (unlift(Member.unapply))

  implicit val memberReads: Reads[Member] = (
    (JsPath \ "id").read[Long] and
    (JsPath \ "user_id").read[Long] and
    (JsPath \ "team_id").read[Long]
  ) (Member.apply _)

  // REST

  // GET /teams
  def getAll = Action.async {
    teamDAO.getAllPretty() map {
      results => {
        val jsonArr = results map {
          result => Json.obj(
            "id" -> result._1,
            "name" -> result._2,
            "descr" -> result._3,
            "cr_name" -> result._4,
            "cr_surname" -> result._5,
            "cr_gp" -> result._6
          )
        }

        Ok(Json.toJson(jsonArr))
      }
    }
  }

  // GET /teams/:id
  def get(id: Long) = Action.async {
    teamDAO.findById(id).map { team => Ok(Json.toJson(team)) }
  }

  // GET /teams/:id/tasks
  def getTasks(id: Long) = Action.async {
    taskDAO.getTeamTasks1(id) map {
      results => {
        val jsonArr = results map {
          result => Json.obj(
            "id" -> result._1,
            "text" -> result._2,
            "deadline" -> result._3,
            "status" -> result._4,
            "points" -> result._5,
            "team_id" -> result._6,
            "team_name" -> result._7,
            "performer_name" -> result._8,
            "performer_surname" -> result._9,
            "performer_gp" -> result._10
          )
        }

        Ok(Json.toJson(jsonArr))
      }
    }
  }

  // GET /teams/:id/users
  def getMembers(id: Long) = Action.async {
    memberDAO.getUsersForTeam(id).map { members => Ok(Json.toJson(members)) }
  }

  // POST /teams
  def add = Action.async(parse.json) {
    implicit request => request.body.validate[Team] match {
      case s: JsSuccess[Team] => teamDAO.insert(s.get)
        .map(teamID => Ok(Json.obj("status" -> "ok", "id" -> teamID)))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // POST /teams/user
  def addUser = Action.async(parse.json) {
    implicit request => request.body.validate[Member] match {
      case s: JsSuccess[Member] => memberDAO.addUserToTeam(s.get).map(_ => Ok(resOk))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // POST /teams/check_member
  def isMember = Action.async(parse.json) {
    implicit request => request.body.validate[Member] match {
      case s: JsSuccess[Member] => memberDAO.isMember(s.get).map { member => Ok(Json.toJson(member)) }
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // DELETE /teams/:teamID/user/:userID
  def removeUser(teamID: Long, userID: Long) = Action.async {
      memberDAO.removeUserFromTeam(Member(0, userID, teamID)).map(_ => Ok(resOk))
  }

  // PUT /teams/:id
  def update = Action.async(parse.json) {
    implicit request => request.body.validate[Team] match {
      case s: JsSuccess[Team] => teamDAO.update(s.get).map(_ => Ok(resOk))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // DELETE /teams/:id
  def delete(id: Long) = Action.async {
    teamDAO.delete(id).map(_ => Ok(resOk))
  }

}
