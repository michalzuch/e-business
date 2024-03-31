package com.example

import com.example.plugins.*
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

suspend fun main() {
    val dotenv = dotenv()
    val kord = Kord(dotenv.get("DISCORD_BOT_TOKEN"))

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on
        if (message.content != "!ping") return@on
        message.channel.createMessage("Pong!")
    }

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on
        if (!message.content.startsWith("!")) return@on

        if (message.content == "!categories") {
            message.channel.createMessage(getCategoriesNames())
        } else if (message.content.startsWith("!products")) {
            val categoryName = message.content.removePrefix("!products").trim()
            val categoryId = categories.find { it.name.equals(categoryName, ignoreCase = true) }?.id

            if (categoryId != null) {
                val productsString = getProductsDetails(categoryId)
                message.channel.createMessage(productsString)
            } else {
                message.channel.createMessage("Category not found.")
            }
        } else {
            message.channel.createMessage(
                "**Available commands:** \n" +
                        "`!categories` - return all categories\n" +
                        "`!products category_name` - return products from selected category\n" +
                        "`!help` - show this help message"
            )
        }
    }

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module(kord)
    }.start(wait = false)

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

fun Application.module(kord: Kord) {
    messageSenderModule(kord)
}
