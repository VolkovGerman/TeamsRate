package controllers

import javax.inject._

import models.User
import dao.UserDAO
import play.api.i18n.{I18nSupport, Lang, Messages, MessagesApi}
import javax.inject.Inject

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.Action
import play.api.mvc.Controller
import play.api.libs.json._
import play.api.libs.functional.syntax._


/**
  * Created by volkov97 on 24.9.16.
  */

@Singleton
class UserController @Inject() (userDAO: UserDAO) (val messagesApi: MessagesApi) extends Controller with I18nSupport {

  implicit val userWrites: Writes[User] = (
    (JsPath \ "id").write[Int] and
    (JsPath \ "name").write[String] and
    (JsPath \ "surname").write[String] and
    (JsPath \ "email").write[String] and
    (JsPath \ "password").write[String]
  ) (unlift(User.unapply))

  implicit val userReads: Reads[User] = (
    (JsPath \ "id").read[Int] and
    (JsPath \ "name").read[String] and
    (JsPath \ "surname").read[String] and
    (JsPath \ "email").read[String] and
    (JsPath \ "password").read[String]
  )(User.apply _)

  def all = Action.async { implicit request => {
      userDAO.all().map { case (users) => Ok(Json.toJson(users)) }
        /*.withHeaders(
        "Access-Control-Allow-Origin" -> "*"   // Added this header
      ) }*/
    }
  }

  def addUser = Action.async(parse.json) {
    implicit request => {
      request.body.validate[User] match {
        case s: JsSuccess[User] => {
          userDAO.insert(s.get).map(_ => Ok(Json.obj("status" -> "ok")))
        }/*
        case e: JsError => {
          Ok(Json.obj("status" -> "error"))
        }*/
      }

    }
  }

  def updateUser(id: Int) = Action.async(parse.json) {
    implicit request => {
      request.body.validate[User] match {
        case s: JsSuccess[User] => {
          userDAO.updateUser(id, s.get).map(_ => Ok(Json.obj("status" -> "ok")))
        }/*
        case e: JsError => {
          Ok(Json.obj("status" -> "error"))
        }*/
      }

    }
  }

  def deleteUser(id: Int) = Action.async {
    implicit request => {
      userDAO.delete(id).map(_ => Ok(Json.obj("status" -> "ok")))
    }
  }

}