package com.example.plugins

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.entity.channel.TextChannel
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json

fun Application.messageSenderModule(kord: Kord) {
    routing {
        post("/send") {
            val request = call.receive<String>()
            val (message, channel) = Json.decodeFromString<MessageRequest>(request)
            kord.getChannelOf<TextChannel>(Snowflake(channel))?.createMessage(message)
            call.respond("Message sent")
        }
    }
}
