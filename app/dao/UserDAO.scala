package dao

import javax.inject.{Inject, Singleton}
import models.User
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.driver.JdbcProfile

import scala.concurrent.Future

@Singleton()
class UserDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  import driver.api._

  private class UsersTable(tag: Tag) extends Table[User](tag, "USER") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def surname = column[String]("SURNAME")
    def photo_url = column[String]("PHOTO_URL")
    def gp_id = column[String]("GP")

    def * = (id, name, surname, photo_url, gp_id) <> (User.tupled, User.unapply _)
  }

  private val users = TableQuery[UsersTable]

  // Retrieve all users
  def getAll(): Future[Seq[User]] = {
    db.run(users.result)
  }

  // Retrieve a user from the id.
  def findById(id: Long): Future[Option[User]] =
    db.run(users.filter(_.id === id).result.headOption)

  // Count all users.
  def count(): Future[Int] =
    db.run(users.length.result)

  // Count users with a filter.
  def count(filter: String): Future[Int] =
    db.run(users.filter { user => user.name.toLowerCase like filter.toLowerCase }.length.result)

  // Insert a new user.
  def insert(user: User): Future[Long] =
    db.run(users returning users.map(_.id) += user)

  // Insert new user only if it exists
  def insertIfNotExists(newUser: User): Future[Long] = {
    val action = users.filter {
      user => user.gp_id.toLowerCase like newUser.gp_id.toLowerCase
    }.result.headOption.flatMap {
      case Some(user) => DBIO.successful(user.id)
      case None => users returning users.map(_.id) += newUser
    }.transactionally

    db.run(action)
  }

  // Insert new users.
  def insert(users: Seq[User]): Future[Unit] =
    db.run(this.users ++= users).map(_ => ())

  // Update a user.
  def update(id: Long, user: User): Future[Unit] = {
    val action = users.filter(_.id === id)
      .map(user => (user.name, user.surname, user.photo_url))
      .update(user.name, user.surname, user.photo_url)
      .map(_ => ())

    db.run(action)
  }

  // Delete a user.
  def delete(id: Long): Future[Unit] =
    db.run(users.filter(_.id === id).delete).map(_ => ())

}