package controllers

import javax.inject.{Inject, Singleton}

import dao.{TaskDAO}
import models.{Task}
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
class TaskController @Inject() (taskDAO: TaskDAO) (val messagesApi: MessagesApi)
  extends Controller with I18nSupport {

  // JSON Results
  val resOk = Json.obj("status" -> "ok")
  val resError = Json.obj("status" -> "error")

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

  // GET /tasks
  def getAll = Action.async {
    taskDAO.getAll().map(tasks => Ok(Json.toJson(tasks)))
  }

  // GET /tasks/:id
  def get(id: Long) = Action.async {
    taskDAO.findById(id).map { task => Ok(Json.toJson(task)) }
  }

  // POST /tasks
  def add = Action.async(parse.json) {
    implicit request => request.body.validate[Task] match {
      case s: JsSuccess[Task] => taskDAO.insert(s.get)
        .map(taskID => Ok(Json.obj("status" -> "ok", "id" -> taskID)))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // PUT /tasks/:id
  def update(id: Long) = Action.async(parse.json) {
    implicit request => request.body.validate[Task] match {
      case s: JsSuccess[Task] => taskDAO.update(id, s.get).map(_ => Ok(resOk))
      case e: JsError => Future.successful(Ok(resError))
    }
  }

  // DELETE /tasks/:id
  def delete(id: Long) = Action.async {
    taskDAO.delete(id).map(_ => Ok(resOk))
  }

}
