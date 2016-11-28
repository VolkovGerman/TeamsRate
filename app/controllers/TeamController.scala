package controllers

import javax.inject.{Inject, Singleton}

import dao.TeamDAO
import models.{Team}
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
class TeamController @Inject() (teamDAO: TeamDAO) (val messagesApi: MessagesApi) extends Controller with I18nSupport {

  // JSON Results
  val resOk = Json.obj("status" -> "ok")
  val resError = Json.obj("status" -> "error")

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

  // REST

  // GET /teams
  def getAll = Action.async {
    teamDAO.getAll().map(teams => Ok(Json.toJson(teams)))
  }

  // GET /teams/:id
  def get(id: Long) = Action.async {
    teamDAO.findById(id).map { team => Ok(Json.toJson(team)) }
  }

  // POST /teams
  def add = Action.async(parse.json) {
    implicit request => request.body.validate[Team] match {
      case s: JsSuccess[Team] => teamDAO.insert(s.get)
        .map(teamID => Ok(Json.obj("status" -> "ok", "id" -> teamID)))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // PUT /teams/:id
  def update(id: Long) = Action.async(parse.json) {
    implicit request => request.body.validate[Team] match {
      case s: JsSuccess[Team] => teamDAO.update(id, s.get).map(_ => Ok(resOk))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // DELETE /teams/:id
  def delete(id: Long) = Action.async {
    teamDAO.delete(id).map(_ => Ok(resOk))
  }

}
