package com.example

import com.example.plugins.messageSenderModule
import dev.kord.core.Kord
import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

suspend fun main() {
    val dotenv = dotenv()
    val kord = Kord(dotenv.get("DISCORD_BOT_TOKEN"))

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module(kord)
    }.start(wait = true)

    kord.login()
}

fun Application.module(kord: Kord) {
    messageSenderModule(kord)
}
