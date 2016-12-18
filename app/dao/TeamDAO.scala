package dao

import javax.inject.{Inject, Singleton}

import models.{Team, User}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.driver.JdbcProfile

import scala.concurrent.Future

@Singleton()
class TeamDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  import driver.api._

  private class TeamsTable(tag: Tag) extends Table[Team](tag, "TEAM") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def descr = column[String]("DESCR")
    def creator_id = column[Long]("CREATOR_ID")

    def * = (id, name, descr, creator_id) <> (Team.tupled, Team.unapply _)
  }

  private class UsersTable(tag: Tag) extends Table[User](tag, "USER") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def surname = column[String]("SURNAME")
    def photo_url = column[String]("PHOTO_URL")
    def gp_id = column[String]("GP")

    def * = (id, name, surname, photo_url, gp_id) <> (User.tupled, User.unapply _)
  }

  private val teams = TableQuery[TeamsTable]
  private val users = TableQuery[UsersTable]

  // Retrieve all teams
  def getAll(): Future[Seq[Team]] =
    db.run(teams.result)

  def getAllPretty(): Future[Seq[(Long, String, String, String, String, String)]] = {
    val innerJoin = for {
      (t, u) <- teams join users on (_.creator_id === _.id)
    } yield (t.id, t.name, t.descr, u.name, u.surname, u.gp_id)

    db.run(innerJoin.result)
  }

  // Retrieve a team from the id.
  def findById(id: Long): Future[Option[Team]] =
    db.run(teams.filter(_.id === id).result.headOption)

  // Count all teams.
  def count(): Future[Int] =
    db.run(teams.length.result)

  // Count teams with a filter.
  def count(filter: String): Future[Int] =
    db.run(teams.filter { team => team.name.toLowerCase like filter.toLowerCase }.length.result)

  // Insert a new team.
  def insert(team: Team): Future[Long] =
    db.run(teams returning teams.map(_.id) += team)

  // Insert new teams.
  def insert(teams: Seq[Team]): Future[Unit] =
    db.run(this.teams ++= teams).map(_ => ())

  // Update a team.
  def update(teamUpdated: Team): Future[Unit] = {
    val action = teams.filter(_.id === teamUpdated.id)
      .map(team => (team.name, team.descr))
      .update(teamUpdated.name, teamUpdated.descr)
      .map(_ => ())

    db.run(action)
  }

  // Delete a team.
  def delete(id: Long): Future[Unit] =
    db.run(teams.filter(_.id === id).delete).map(_ => ())

}