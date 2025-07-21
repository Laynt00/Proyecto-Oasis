package com.backend.backend.model;

public enum ResourceType {
        FONT,
        BENCH,
        DOG_PARK;

        // Optional: Add display names if needed
        public String getDisplayName() {
            switch(this) {
                case FONT: return "Fuente";
                case BENCH: return "Banco";
                case DOG_PARK: return "DogPark";
                default: throw new IllegalArgumentException();
            }
        }
}
