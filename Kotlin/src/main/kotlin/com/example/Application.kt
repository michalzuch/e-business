package com.example

import com.example.plugins.getCategoriesNames
import com.example.plugins.messageSenderModule
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
        if (message.content != "!categories") return@on
        message.channel.createMessage(getCategoriesNames())
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
