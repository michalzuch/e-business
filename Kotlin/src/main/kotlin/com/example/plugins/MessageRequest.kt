package com.example.plugins

import kotlinx.serialization.Serializable

@Serializable
data class MessageRequest(val message: String, val channel: String)
