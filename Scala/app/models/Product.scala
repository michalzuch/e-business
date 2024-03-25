package models

import play.api.libs.json._

case class Product(id: Int, name: String, description: String, price: Double, stock: Int)

object Product {
  implicit val productReads: Reads[Product] = Json.reads[Product]
  implicit val productWrites: Writes[Product] = Json.writes[Product]
}
