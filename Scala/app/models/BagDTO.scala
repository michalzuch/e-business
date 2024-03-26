package models

import play.api.libs.json._

case class BagDTO(products: Map[Int, Int])

object BagDTO {
  implicit val bagReads: Reads[BagDTO] = Json.reads[BagDTO]
  implicit val bagWrites: Writes[BagDTO] = Json.writes[BagDTO]
}
