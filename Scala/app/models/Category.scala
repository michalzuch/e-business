package models

import play.api.libs.json._

case class Category(id: Int, name: String)

object Category {
  implicit val categoryReads: Reads[Category] = Json.reads[Category]
  implicit val categoryWrites: Writes[Category] = Json.writes[Category]
}
