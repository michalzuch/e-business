package controllers

import models.{Product, ProductDTO}
import play.api.libs.json._
import play.api.mvc._

import javax.inject._

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  var products: List[Product] = List(
    Product(1, "Laptop", "Powerful laptop for work and gaming", 999.99, 10, 1),
    Product(2, "Smartphone", "Latest smartphone with great features", 599.99, 20, 1),
    Product(3, "Headphones", "Noise-cancelling headphones for immersive experience", 99.99, 30, 1)
  )

  def create(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[ProductDTO].fold(
      errors => {
        val errorMessages = JsError.toJson(errors).toString()
        BadRequest(s"Invalid JSON: $errorMessages")
      },
      product => {
        val id = products.map(_.id).maxOption.getOrElse(0) + 1
        val newProduct = Product(id, product.name, product.description, product.price, product.stock, product.category)
        products = products :+ newProduct
        Ok(Json.toJson(newProduct))
      }
    )
  }

  def getAll: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    if (products.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(products))
    }
  }

  def get(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound
    }
  }

  def update(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    products.find(_.id == id) match {
      case Some(_) =>
        val updatedProduct = request.body.asJson.get.as[ProductDTO]
        products = products.map {
          case product if product.id == id =>
            Product(id, updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.stock, updatedProduct.category)
          case product => product
        }
        Ok(Json.toJson(products.find(_.id == id).get))
      case None => NotFound("Product not found")
    }
  }

  def delete(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    products.find(_.id == id) match {
      case Some(_) =>
        products = products.filterNot(_.id == id)
        Ok("Product deleted")
      case None => NotFound("Product not found")
    }
  }
}
