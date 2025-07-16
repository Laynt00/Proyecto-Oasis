package com.backend.backend.model;

public enum ResourceType {
        FONT,
        BENCH,
        DOGPARK;

        // Optional: Add display names if needed
        public String getDisplayName() {
            switch(this) {
                case FONT: return "Fuente";
                case BENCH: return "Banco";
                case DOGPARK: return "DogPark";
                default: throw new IllegalArgumentException();
            }
        }
}
