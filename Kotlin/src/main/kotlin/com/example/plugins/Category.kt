package com.example.plugins

import kotlinx.serialization.Serializable

@Serializable
data class Category(val id: Int, val name: String)

val categories: List<Category> = listOf(
    Category(1, "Electronics"),
    Category(2, "Clothing"),
    Category(3, "Books")
)

fun getCategoriesNames(): String {
    return categories.joinToString(separator = "\n") { it.name }
}