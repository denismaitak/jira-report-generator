function add_highlight() {
  var assignees = document.querySelectorAll(".assignees > tbody > tr");
  var epics = document.querySelectorAll(".epics > tbody > tr");
  var stories = document.querySelectorAll(".stories > tbody > tr");
  var versions = document.querySelectorAll(".issues th.version");

  function deselect(doc, className) {
    doc.querySelectorAll(`tr.${className}`).forEach((el) => {
      el.classList.remove(className);
    })
  }

  for (var i in assignees) {
    var assignee = assignees[i];

    if (
        assignee !== undefined
        && assignee.attributes !== undefined
        && assignee.attributes['data-assignee-id'] !== undefined
    ) {
      var assigneeId = assignee.attributes['data-assignee-id'];

      var listenerSelector = (
        `table.assignees [${assigneeId.name}="${assigneeId.value}"]`
      );

      document.querySelector(listenerSelector).onclick = function () {
        var attr = this.attributes['data-assignee-id'];
        var selector = (
          `table.component [${attr.name}="${attr.value}"]`
        );

        deselect(document, "highlighted-epic");
        deselect(document, "highlighted-story");

        this.classList.toggle("highlighted");

        document.querySelectorAll(selector).forEach((el) => {
          el.classList.toggle("highlighted");
        })
      }
    }
  }

  for (var i in epics) {
    var epic = epics[i];

    if (
        epic !== undefined
        && epic.attributes !== undefined
        && epic.attributes['data-epic-id'] !== undefined
    ) {
      var epicId = epic.attributes['data-epic-id'];

      var listenerSelector = (
        `table.epics [${epicId.name}="${epicId.value}"]`
      );

      document.querySelector(listenerSelector).onclick = function () {
        var attr = this.attributes['data-epic-id'];
        var selector = (
          `table.component [data-parent-id="${attr.value}"]`
        );

        deselect(document, "highlighted");
        deselect(document, "highlighted-story");

        this.classList.toggle("highlighted-epic");

        document.querySelectorAll(selector).forEach((el) => {
          el.classList.toggle("highlighted-epic");
        })
      }
    }
  }

  for (var i in stories) {
    var story = stories[i];

    if (
        story !== undefined
        && story.attributes !== undefined
        && story.attributes['data-story-id'] !== undefined
    ) {
      var storyId = story.attributes['data-story-id'];

      var listenerSelector = (
        `table.stories [${storyId.name}="${storyId.value}"]`
      );

      document.querySelector(listenerSelector).onclick = function () {
        var attr = this.attributes['data-story-id'];
        var selector = (
          `table.component [data-parent-id="${attr.value}"]`
        );

        deselect(document, "highlighted");
        deselect(document, "highlighted-epic");

        this.classList.toggle("highlighted-story");

        document.querySelectorAll(selector).forEach((el) => {
          el.classList.toggle("highlighted-story");
        })
      }
    }
  }

  for (var i in versions) {
    var version = versions[i];

    if (
        version !== undefined
        && version.attributes !== undefined
        && version.attributes['data-version-id'] !== undefined
    ) {
      var versionId = version.attributes['data-version-id'];
      var componentId = version.attributes['data-component-id'];

      var listenerSelector = (
        `table.component [${versionId.name}="${versionId.value}"]`
        +`[${componentId.name}="${componentId.value}"] > span.collapse`
      );

      document.querySelector(listenerSelector).onclick = function () {
        var attr = this.parentNode.attributes['data-version-id'];
        var componentAttr = this.parentNode.attributes['data-component-id'];
        var selector = (
          `table.component [data-version-ids="${attr.value}"]`
          +`[data-component-id="${componentAttr.value}"]`
        );

        this.classList.toggle("up");
        this.parentNode.classList.toggle("collapsed");

        document.querySelectorAll(selector).forEach((el) => {
          el.classList.toggle("hidden");
        })
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", add_highlight)

export { add_highlight };