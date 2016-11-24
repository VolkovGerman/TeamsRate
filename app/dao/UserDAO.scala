package dao

import scala.concurrent.Future

import javax.inject.Inject
import models.User
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.driver.JdbcProfile

/**
  * Created by volkov97 on 25.9.16.
  */
class UserDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends HasDatabaseConfigProvider[JdbcProfile] {
  import driver.api._

  private val Users = TableQuery[UsersTable]

  private def findByLoginAndPassword(email: String, password: String) = Users.filter(x => (x.password === password && x.email === email))
  private def findByEmail(email: String) = Users.filter(x => (x.email === email))

  def all(): Future[Seq[User]] = db.run(Users.result)

  def insert(user: User): Future[Unit] = db.run(Users += user).map { _ => () }

  def auth(login: String, password: String): Future[Any] = db.run(findByLoginAndPassword(login, password).result.headOption.map(user => user.getOrElse(None)))

  def getUserIdByEmail(email: String): Future[Any] = db.run(findByEmail(email).result.headOption.map(user => user.getOrElse(None)))

  def updateUser(id: Int, user: User): Future[Any] = db.run(Users.filter(_.id === id).update(user))

  def delete(id: Int): Future[Any] = db.run(Users.filter(x => x.id === id).delete)

  private class UsersTable(tag: Tag) extends Table[User](tag, "USER") {
    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def surname = column[String]("SURNAME")
    def email = column[String]("EMAIL")
    def password = column[String]("PASSWORD")

    def * = (id, name, surname, email, password) <> (User.tupled, User.unapply _)
  }
}
