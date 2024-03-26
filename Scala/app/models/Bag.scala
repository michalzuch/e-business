package models

import play.api.libs.json._

case class Bag(id: Int, products: Map[Int, Int])

object Bag {
  implicit val bagReads: Reads[Bag] = Json.reads[Bag]
  implicit val bagWrites: Writes[Bag] = Json.writes[Bag]
}
