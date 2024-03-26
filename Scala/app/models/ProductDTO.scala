package models

import play.api.libs.json._

case class ProductDTO(name: String, description: String, price: Double, stock: Int, category: Int)

object ProductDTO {
  implicit val productReads: Reads[ProductDTO] = Json.reads[ProductDTO]
  implicit val productWrites: Writes[ProductDTO] = Json.writes[ProductDTO]
}
