// @description Composer toggle: while on, everything you send is wrapped in spoiler tags
// @version 1.0.0
// @author cmdr-chara

const KEY = "enabled";

let on = phoenix.storage.get<boolean>(KEY) ?? false;

phoenix.ui.addComposerButton({
  icon: "res://ic_mana_image_spoiler",
  label: "Spoiler mode",
  onPress() {
    on = !on;
    phoenix.storage.set(KEY, on);
    phoenix.ui.toast(on ? "Spoiler mode on" : "Spoiler mode off");
  },
});

phoenix.messages.onSend((text) =>
  on && text.trim() && !text.startsWith("||") ? `||${text}||` : undefined,
);
