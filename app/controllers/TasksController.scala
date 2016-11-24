package controllers

import javax.inject._

import play.api.mvc._

@Singleton
class TasksController @Inject() extends Controller {

  def newTask(name: String, descr: String) = TODO

  def deleteTask(id: Long) = TODO

  def updateTask(id: Long, field: String, value: String) = TODO

}
