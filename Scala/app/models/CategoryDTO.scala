package models

import play.api.libs.json._

case class CategoryDTO(name: String)

object CategoryDTO {
  implicit val categoryReads: Reads[CategoryDTO] = Json.reads[CategoryDTO]
  implicit val categoryWrites: Writes[CategoryDTO] = Json.writes[CategoryDTO]
}
