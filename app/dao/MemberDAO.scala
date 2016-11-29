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
    def vk_id = column[String]("VK")

    def * = (id, name, surname, vk_id) <> (User.tupled, User.unapply _)
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

    def * = (id, user_id, team_id) <> (Member.tupled, Member.unapply _)
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

}