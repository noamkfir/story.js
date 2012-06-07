/// <reference path="story.js" />
/// <reference path="../lib/jasmine-1.2.0/jasmine.js" />

describe("The in-memory storage", function () {

    var storage = story.storage(story.StorageTypes.IN_MEMORY);

    var failingError = function (error) {
        fail(error);
    };

    beforeEach(function () {
        storage.clear();
    });

    it("should be able to add and return a key value pair", function () {
        storage.add("key", "value").then(function (data) {
            expect(data.key).toEqual("key");
            expect(data.value).toEqual("value");
        }, failingError);
    });

    it("should be able to retrieve an existing value by key", function () {
        storage.add("key", "value").then(function () {
            storage.get("key").then(function (data) {
                expect(data).toEqual("value");
            }, failingError);
        }, failingError);
    });

    it("should return true when a specific key is found", function () {
        storage.add("key", "value").then(function () {
            storage.contains("key").then(function (data) {
                expect(data).toEqual(true);
            }, failingError);
        }, failingError);
    });

    it("should replace the value on update", function () {
        storage.add("key", "value").then(function () {
            storage.update("key", "value1").then(function () {
                storage.get("key").then(function(data) {
                    expect(data).toEqual("value1");
                }, failingError);
            }, failingError);
        }, failingError);
    });

    it("should delete a key value pair on remove", function() {
        storage.add("key", "value").then(function() {
            storage.remove("key").then(function () {
                storage.contains("key").then(function(data) {
                    expect(data).toEqual(false);
                }, failingError);
            }, failingError);
        }, failingError);
    });

    it("should return undefined for missing value", function() {
        storage.get("key").then(function(data) {
            expect(data).toBeUndefined();
        }, failingError);
    });

    it("should empty the storage on clear", function() {
        storage.add("key", "value").then(function() {
            storage.clear().then(function () {
                storage.contains("key").then(function(data) {
                    expect(data).toEqual(false);
                }, failingError);
            }, failingError);
        }, failingError);
    });
});
