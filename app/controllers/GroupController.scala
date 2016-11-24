package controllers

import javax.inject.{Inject, Singleton}

import play.api.mvc.Controller

/**
  * Created by volkov97 on 24.9.16.
  */
@Singleton
class GroupController @Inject() extends Controller {

  def index(id: Long) = TODO;

  def members(id: Long) = TODO;

  def settings(id: Long) = TODO;

}
