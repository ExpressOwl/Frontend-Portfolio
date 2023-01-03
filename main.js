// Tab functionality
class Tab {
  constructor(tab) {
    this.tab = tab;
  }

  showTab() {
    this.tab.setAttribute("aria-selected", "true");
    this.tab.removeAttribute("tabindex");
  }

  hideTab() {
    this.tab.setAttribute("aria-selected", "false");
    this.tab.setAttribute("tabindex", "-1");
  }

  focusTab() {
    this.tab.focus();
  }
}

class Panel {
  constructor(panel) {
    this.panel = panel;
  }

  showPanel() {
    this.panel.removeAttribute("hidden");
  }

  hidePanel() {
    this.panel.setAttribute("hidden", "true");
  }
}

class Tablist {
  constructor(id, dir) {
    this.id = id;
    this.dir = dir;
    this.tabs = this.initializeTabs();
    this.panels = this.initializePanels();
    this.addListeners();
  }

  initializeTabs() {
    if (!this.id) {
      throw new Error("You must pass an ID when initializing");
    }
    return [...document.querySelectorAll(`#${this.id} [role='tab']`)].map(
      (t) => new Tab(t)
    );
  }

  initializePanels() {
    return [...document.querySelectorAll(`#${this.id} [role='tab_panel']`)].map(
      (p) => new Panel(p)
    );
  }

  activatePanel(e) {
    if (e.target === e.currentTarget) {return}
    this.tabs.forEach((t) => {
      e.target.id === t.tab.id ? t.showTab() : t.hideTab();
    });
    this.panels.forEach((p) => {
      e.target.getAttribute("aria-controls") === p.panel.id
        ? p.showPanel()
        : p.hidePanel();
    });
  }

  addListeners() {
    const tablist = document.querySelector(`#${this.id} [role='tablist']`);

    tablist.addEventListener("click", (e) => {
      this.activatePanel(e);
    });
  }
}

const list = new Tablist("list");
// Tab functionality

// Underline on navbar

// Underline on navbar
