package dao

import javax.inject.{Inject, Singleton}
import models.{User, Team, Member}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.Future

@Singleton()
class MemberDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
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

  private class TeamsTable(tag: Tag) extends Table[Team](tag, "TEAM") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def descr = column[String]("DESCR")
    def creator_id = column[Long]("CREATOR_ID")

    def * = (id, name, descr, creator_id) <> (Team.tupled, Team.unapply _)
  }

  private class MembersTable(tag: Tag) extends Table[Member](tag, "MEMBER") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def user_id = column[Long]("USER_ID")
    def team_id = column[Long]("TEAM_ID")
    def points = column[Long]("POINTS")

    def * = (id, user_id, team_id, points) <> (Member.tupled, Member.unapply _)
  }

  private val members = TableQuery[MembersTable]
  private val users = TableQuery[UsersTable]
  private val teams = TableQuery[TeamsTable]

  def getTeamsForUser(activeUserId: Long): Future[Seq[Team]] = {
    val innerJoin = for {
      (m, t) <- members.filter(_.user_id === activeUserId) join teams on (_.team_id === _.id)
    } yield t

    db.run(innerJoin.result)
  }

  def getUsersForTeam(activeTeamId: Long): Future[Seq[(Long, String, String, String, String, Long)]] = {
    val innerJoin = for {
      (m, u) <- members.filter(_.team_id === activeTeamId) join users on (_.user_id === _.id)
    } yield (u.id, u.name, u.surname, u.photo_url, u.gp_id, m.points)

    db.run(innerJoin.result)
  }

  // Get total points of the user
  def getPoints(id: Long): Future[Option[Long]] = {
    val q = members.filter(_.user_id === id).map(_.points).sum

    db.run(q.result)
  }

  def addUserToTeam(member: Member): Future[Long] =
    db.run(members returning members.map(_.id) += member)

  def isMember(member: Member): Future[Option[Member]] =
    db.run(members.filter(_.user_id === member.user_id).filter(_.team_id === member.team_id).result.headOption)

  def removeUserFromTeam(member: Member): Future[Int] =
    db.run(members.filter(_.user_id === member.user_id).filter(_.team_id === member.team_id).delete)
}