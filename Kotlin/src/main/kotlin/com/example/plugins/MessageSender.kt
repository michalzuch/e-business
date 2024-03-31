package com.example.plugins

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.entity.channel.TextChannel
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

fun Application.messageSenderModule(kord: Kord) {
    routing {
        post("/send") {
            val request = call.receive<String>()
            val (message, channel) = Json.decodeFromString<MessageRequest>(request)
            kord.getChannelOf<TextChannel>(Snowflake(channel))?.createMessage(message)
            call.respond("Message sent")
        }

        get("/categories") {
            val categoriesJson = Json.encodeToString(categories)
            call.respondText(categoriesJson, ContentType.Application.Json)
        }

        get("/products") {
            val request = call.receive<String>()
            val (category) = Json.decodeFromString<CategoryRequest>(request)
            val productsJson = Json.encodeToString(products.filter { it.category == findCategoryIdByName(category) })
            call.respondText(productsJson, ContentType.Application.Json)
        }
    }
}

fun Application.slackSenderModule() {
    routing {
        post("/slack/events") {
            val params = call.receiveParameters()
            val command = params["command"]
            val text = params["text"]

            val response = when (command) {
                "/categories" -> getCategoriesNames()
                "/products" -> {
                    val categoryId = findCategoryIdByName(text.toString())
                    if (categoryId != null) {
                        getProductsDetails(categoryId)
                    } else {
                        ""
                    }
                }

                else -> "Command not recognized"
            }
            call.respondText(response)
        }
    }
}
