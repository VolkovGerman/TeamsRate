package controllers

/**
  * Created by volkov97 on 27.9.16.
  */

import play.api.mvc._
import play.api.mvc.Results._

import scala.concurrent.Future

object LoginUserAction extends ActionBuilder[Request] {
  override def invokeBlock[A](request: Request[A], block: (Request[A]) => Future[Result]) = {
    request.session.get("connected") match {
      case Some(x) => block(request)
      case None => Future.successful(NotFound("no auth token"))
    }
  }
}
