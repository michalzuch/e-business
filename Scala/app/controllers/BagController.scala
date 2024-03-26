package controllers

import models.{Bag, BagDTO}
import play.api.libs.json._
import play.api.mvc._

import javax.inject._

@Singleton
class BagController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  var bags: List[Bag] = List(
    Bag(1, Map(1 -> 2, 2 -> 1)),
    Bag(2, Map(3 -> 1))
  )

  def create(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[BagDTO].fold(
      errors => {
        val errorMessages = JsError.toJson(errors).toString()
        BadRequest(s"Invalid JSON: $errorMessages")
      },
      bag => {
        val id = bags.map(_.id).maxOption.getOrElse(0) + 1
        val newBag = Bag(id, bag.products)
        bags = bags :+ newBag
        Ok(Json.toJson(newBag))
      }
    )
  }

  def getAll: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    if (bags.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(bags))
    }
  }

  def get(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    bags.find(_.id == id) match {
      case Some(bag) => Ok(Json.toJson(bag))
      case None => NotFound
    }
  }

  def update(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    bags.find(_.id == id) match {
      case Some(_) =>
        val updatedBag = request.body.asJson.get.as[BagDTO]
        bags = bags.map {
          case category if category.id == id =>
            Bag(id, updatedBag.products)
          case bag => bag
        }
        Ok(Json.toJson(bags.find(_.id == id).get))
      case None => NotFound("Bag not found")
    }
  }

  def delete(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    bags.find(_.id == id) match {
      case Some(_) =>
        bags = bags.filterNot(_.id == id)
        Ok("Bag deleted")
      case None => NotFound("Bag not found")
    }
  }
}
