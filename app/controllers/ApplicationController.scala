package controllers

import javax.inject.{Inject, _}

import dao.UserDAO
import models.User
import dao.UserDAO
import play.api.data.Forms.{mapping, _}
import play.api.mvc.{Action, Controller}
import play.api.i18n.{I18nSupport, MessagesApi, Messages, Lang}
import play.api.mvc.Results._

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class ApplicationController @Inject() (userDAO: UserDAO) (val messagesApi: MessagesApi) extends Controller with I18nSupport {
  /*
  def welcome = Action.apply { implicit request =>
    request.session.get("connected").map {
      userId => Redirect(routes.UserController.feed)
    }.getOrElse {
      Ok.apply(views.html.application.welcome.apply("Welcome"))
    }
  }

  def loginPage = Action.apply {
    Ok.apply(views.html.application.login.apply("Login"))
  }


  def login = Action.async { implicit request =>
    val params = request.body.asFormUrlEncoded
    val email = params.get.apply("email").head
    val password = params.get.apply("password").head

    userDAO.auth(email, password) map {
        case user:User => Redirect(routes.UserController.feed).withSession(request.session + ("connected" -> user.id.toString()))
        case _ => Ok(views.html.application.login.apply("Login"))
    }
  }

  def registrationPage = Action.apply { implicit request =>
    Ok.apply(views.html.application.registration.apply("Registration"))
  }

  def registration = Action.async { implicit request =>
    val params = request.body.asFormUrlEncoded

    val user = User.apply(
      0,
      params.get.apply("name").head,
      params.get.apply("surname").head,
      params.get.apply("email").head,
      params.get.apply("password").head
    )

    val email = params.get.apply("email").head
    val password = params.get.apply("password").head

    userDAO.insert(user) match {
      case _ => userDAO.getUserIdByEmail(email).map {
        case x:User => Redirect(routes.UserController.feed).withSession(request.session + ("connected" -> x.id.toString()))
        case _ => InternalServerError("Oops, something went wrong... Please, try again...")
      }
    }

  }

  def logout = Action.apply { implicit request =>
    Ok.apply(views.html.application.welcome.apply("Welcome")).withSession(request.session - ("connected"))
  }
  */

}
