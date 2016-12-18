package dao

import javax.inject.{Inject, Singleton}

import models.{Task, Team, User}
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

  private class UsersTable(tag: Tag) extends Table[User](tag, "USER") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def surname = column[String]("SURNAME")
    def photo_url = column[String]("PHOTO_URL")
    def gp_id = column[String]("GP")

    def * = (id, name, surname, photo_url, gp_id) <> (User.tupled, User.unapply _)
  }

  private class TeamsTable(tag: Tag) extends Table[Team](tag, "TEAM") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def descr = column[String]("DESCR")
    def creator_id = column[Long]("CREATOR_ID")

    def * = (id, name, descr, creator_id) <> (Team.tupled, Team.unapply _)
  }

  private val tasks = TableQuery[TasksTable]
  private val users = TableQuery[UsersTable]
  private val teams = TableQuery[TeamsTable]

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

  def getUserTasks1(id: Long): Future[Seq[(Long, String, String, Long, Long, Long, String)]] = {
    val innerJoin = for {
      (task, team) <- tasks.filter(_.performer_id === id) join teams on (_.team_id === _.id)
    } yield (task.id, task.text, task.deadline, task.status, task.points, team.id, team.name)

    db.run(innerJoin.result)
  }

  def getTeamTasks(id: Long): Future[Seq[Task]] =
    db.run(tasks.filter(_.team_id === id).result)

  def getTeamTasks1(id: Long): Future[Seq[(
    Long, String, String, Long, Long,
    Long, String,
    Option[String], Option[String], Option[String]
  )]] = {
    val monadicInnerJoin = for {
      (ta, performer) <- tasks.filter(_.team_id === id) joinLeft users on (_.performer_id === _.id)
      te <- teams if ta.team_id === te.id
    } yield (
      ta.id, ta.text, ta.deadline, ta.status, ta.points,
      te.id, te.name,
      performer.map(_.name), performer.map(_.surname), performer.map(_.gp_id)
    )

    db.run(monadicInnerJoin.result)
  }

  def updatePerformer(taskID: Long, performerID: Long): Future[Any] = {
    val action = tasks.filter(_.id === taskID)
      .map(task => (task.performer_id, task.status))
      .update(performerID, 1)

    db.run(action)
  }

  def updateStatus(taskID: Long, status: Long): Future[Any] = {
    val action = tasks.filter(_.id === taskID)
      .map(task => task.status)
      .update(status)

    db.run(action)
  }
}