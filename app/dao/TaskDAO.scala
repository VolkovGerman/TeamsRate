package dao

import javax.inject.{Inject, Singleton}
import models.Task
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.driver.JdbcProfile

import scala.concurrent.Future

@Singleton()
class TaskDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  import driver.api._

  private class TasksTable(tag: Tag) extends Table[Task](tag, "TASK") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def team_id = column[Long]("TEAM_ID")
    def creator_id = column[Long]("CREATOR_ID")
    def performer_id = column[Long]("PERFORMER_ID")
    def text = column[String]("TEXT")
    def deadline = column[String]("DEADLINE")
    def status = column[Long]("STATUS")
    def points = column[Long]("POINTS")

    def * = (id, team_id, creator_id, performer_id, text, deadline, status, points) <> (Task.tupled, Task.unapply _)
  }

  private val tasks = TableQuery[TasksTable]

  // Retrieve all tasks
  def getAll(): Future[Seq[Task]] =
    db.run(tasks.result)

  // Retrieve a task from the id.
  def findById(id: Long): Future[Option[Task]] =
    db.run(tasks.filter(_.id === id).result.headOption)

  // Insert a new task.
  def insert(task: Task): Future[Long] =
    db.run(tasks returning tasks.map(_.id) += task)

  // Insert new tasks.
  def insert(tasks: Seq[Task]): Future[Unit] =
    db.run(this.tasks ++= tasks).map(_ => ())

  // Update a task.
  def update(id: Long, taskUpdated: Task): Future[Unit] = {
    val action = tasks.filter(_.id === id)
      .map(task => (task.text, task.deadline, task.status, task.performer_id, task.points))
      .update(taskUpdated.text, taskUpdated.deadline, taskUpdated.status, taskUpdated.performer_id, taskUpdated.points)
      .map(_ => ())

    db.run(action)
  }

  // Delete a task.
  def delete(id: Long): Future[Unit] =
    db.run(tasks.filter(_.id === id).delete).map(_ => ())

  // Get user's tasks
  def getUserTasks(id: Long): Future[Seq[Task]] =
    db.run(tasks.filter(_.performer_id === id).result)

  def getTeamTasks(id: Long): Future[Seq[Task]] =
    db.run(tasks.filter(_.team_id === id).result)
}