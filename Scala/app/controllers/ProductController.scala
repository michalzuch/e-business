package controllers

import javax.inject._
import play.api._
import play.api.mvc._

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  def create(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok("Product created")
  }

  def getAll: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok("All products retrieved")
  }

  def get(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(s"Product with id $id retrieved")
  }

  def update(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(s"Product with id $id updated")
  }

  def delete(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(s"Product with id $id deleted")
  }
}
