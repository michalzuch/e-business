package controllers

import models.{Category, CategoryDTO}
import play.api.libs.json._
import play.api.mvc._

import javax.inject._

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  var categories: List[Category] = List(
    Category(1, "Electronics"),
    Category(2, "Clothing"),
    Category(3, "Books")
  )

  def create(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[CategoryDTO].fold(
      errors => {
        val errorMessages = JsError.toJson(errors).toString()
        BadRequest(s"Invalid JSON: $errorMessages")
      },
      category => {
        val id = categories.map(_.id).maxOption.getOrElse(0) + 1
        val newCategory = Category(id, category.name)
        categories = categories :+ newCategory
        Ok(Json.toJson(newCategory))
      }
    )
  }

  def getAll: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    if (categories.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(categories))
    }
  }

  def get(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound
    }
  }

  def update(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    categories.find(_.id == id) match {
      case Some(_) =>
        val updatedCategory = request.body.asJson.get.as[CategoryDTO]
        categories = categories.map {
          case category if category.id == id =>
            Category(id, updatedCategory.name)
          case category => category
        }
        Ok(Json.toJson(categories.find(_.id == id).get))
      case None => NotFound("Category not found")
    }
  }

  def delete(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    categories.find(_.id == id) match {
      case Some(_) =>
        categories = categories.filterNot(_.id == id)
        Ok("Category deleted")
      case None => NotFound("Category not found")
    }
  }
}
