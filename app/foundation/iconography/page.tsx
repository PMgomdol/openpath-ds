"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";

// ─── Icon Data ───────────────────────────────────────────────

type IconCategory =
  | "Navigation"
  | "Action"
  | "Communication"
  | "Media"
  | "Files & Content"
  | "Device"
  | "User & Account"
  | "Location"
  | "Selection Controls"
  | "Social & Rating"
  | "General";

type IconEntry = { name: string; category: IconCategory };

const ICONS: IconEntry[] = [
  // Navigation
  { name: "home",             category: "Navigation" },
  { name: "menu",             category: "Navigation" },
  { name: "apps",             category: "Navigation" },
  { name: "backward",         category: "Navigation" },
  { name: "backward_ios",     category: "Navigation" },
  { name: "forward",          category: "Navigation" },
  { name: "forward_ios",      category: "Navigation" },
  { name: "drop_down",        category: "Navigation" },
  { name: "drop_up",          category: "Navigation" },
  { name: "open_down",        category: "Navigation" },
  { name: "open_in_full",     category: "Navigation" },
  { name: "down_lowest",      category: "Navigation" },
  { name: "up_highest",       category: "Navigation" },
  { name: "down_circle",      category: "Navigation" },
  { name: "up_circle",        category: "Navigation" },
  { name: "more_horizontal",  category: "Navigation" },
  { name: "more_vertical",    category: "Navigation" },
  { name: "unfold_less",      category: "Navigation" },
  { name: "unfold_more",      category: "Navigation" },
  { name: "swap_horizontal",  category: "Navigation" },
  { name: "swap_vertical",    category: "Navigation" },
  // Action
  { name: "add",              category: "Action" },
  { name: "add_circle",       category: "Action" },
  { name: "remove",           category: "Action" },
  { name: "remove_circle",    category: "Action" },
  { name: "edit",             category: "Action" },
  { name: "delete",           category: "Action" },
  { name: "delete_forever",   category: "Action" },
  { name: "close",            category: "Action" },
  { name: "close_up",         category: "Action" },
  { name: "cancel_circle",    category: "Action" },
  { name: "done",             category: "Action" },
  { name: "check_circle",     category: "Action" },
  { name: "search",           category: "Action" },
  { name: "filter",           category: "Action" },
  { name: "save",             category: "Action" },
  { name: "send",             category: "Action" },
  { name: "share",            category: "Action" },
  { name: "launch",           category: "Action" },
  { name: "lock",             category: "Action" },
  { name: "unlock",           category: "Action" },
  { name: "security",         category: "Action" },
  { name: "block",            category: "Action" },
  { name: "backspace",        category: "Action" },
  // Communication
  { name: "chat",             category: "Communication" },
  { name: "comment",          category: "Communication" },
  { name: "feedback",         category: "Communication" },
  { name: "mail",             category: "Communication" },
  { name: "message",          category: "Communication" },
  { name: "notification",     category: "Communication" },
  { name: "notification_add", category: "Communication" },
  { name: "notification_off", category: "Communication" },
  { name: "phone",            category: "Communication" },
  { name: "voicemail",        category: "Communication" },
  { name: "announcement",     category: "Communication" },
  // Media
  { name: "play",             category: "Media" },
  { name: "play_circle",      category: "Media" },
  { name: "pause",            category: "Media" },
  { name: "pause_circle",     category: "Media" },
  { name: "stop",             category: "Media" },
  { name: "stop_circle",      category: "Media" },
  { name: "fast_forward",     category: "Media" },
  { name: "rewind",           category: "Media" },
  { name: "next",             category: "Media" },
  { name: "previous",         category: "Media" },
  { name: "skip_next",        category: "Media" },
  { name: "skip_previous",    category: "Media" },
  { name: "replay",           category: "Media" },
  { name: "repeat",           category: "Media" },
  { name: "repeat_one",       category: "Media" },
  { name: "shuffle",          category: "Media" },
  { name: "music",            category: "Media" },
  { name: "headset",          category: "Media" },
  { name: "headset_mic",      category: "Media" },
  { name: "mic",              category: "Media" },
  { name: "mic_off",          category: "Media" },
  { name: "video",            category: "Media" },
  { name: "video_add",        category: "Media" },
  { name: "video_add_off",    category: "Media" },
  { name: "volume_up",        category: "Media" },
  { name: "volume_down",      category: "Media" },
  { name: "volume_off",       category: "Media" },
  { name: "camera",           category: "Media" },
  { name: "photo",            category: "Media" },
  { name: "photo_library",    category: "Media" },
  { name: "fullscreen",       category: "Media" },
  { name: "fullscreen_exit",  category: "Media" },
  // Files & Content
  { name: "file_attachment",      category: "Files & Content" },
  { name: "file_cloud",           category: "Files & Content" },
  { name: "file_cloud_done",      category: "Files & Content" },
  { name: "file_cloud_download",  category: "Files & Content" },
  { name: "file_cloud_off",       category: "Files & Content" },
  { name: "file_cloud_upload",    category: "Files & Content" },
  { name: "file_copy",            category: "Files & Content" },
  { name: "file_document",        category: "Files & Content" },
  { name: "file_folder",          category: "Files & Content" },
  { name: "file_link",            category: "Files & Content" },
  { name: "file_new_folder",      category: "Files & Content" },
  { name: "note",                 category: "Files & Content" },
  { name: "note_add",             category: "Files & Content" },
  { name: "library_add",          category: "Files & Content" },
  { name: "library_add_check",    category: "Files & Content" },
  { name: "book",                 category: "Files & Content" },
  { name: "bookmark",             category: "Files & Content" },
  { name: "bookmark_select",      category: "Files & Content" },
  // Device
  { name: "battery",              category: "Device" },
  { name: "bluetooth",            category: "Device" },
  { name: "bluetooth_connected",  category: "Device" },
  { name: "bluetooth_disabled",   category: "Device" },
  { name: "desktop_pc",           category: "Device" },
  { name: "keyboard",             category: "Device" },
  { name: "mouse",                category: "Device" },
  { name: "smartphone",           category: "Device" },
  { name: "storage_card",         category: "Device" },
  { name: "sim_card",             category: "Device" },
  { name: "no_sim_card",          category: "Device" },
  { name: "power",                category: "Device" },
  { name: "power_off",            category: "Device" },
  { name: "wifi",                 category: "Device" },
  { name: "wifi_off",             category: "Device" },
  { name: "gps_fixed",            category: "Device" },
  { name: "gps_not_fixed",        category: "Device" },
  { name: "gps_off",              category: "Device" },
  { name: "hearing",              category: "Device" },
  { name: "hearing_disabled",     category: "Device" },
  // User & Account
  { name: "user",                 category: "User & Account" },
  { name: "user_add",             category: "User & Account" },
  { name: "user_remove",          category: "User & Account" },
  { name: "user_verified",        category: "User & Account" },
  { name: "account_box",          category: "User & Account" },
  { name: "group",                category: "User & Account" },
  { name: "sign_in",              category: "User & Account" },
  { name: "sign_out",             category: "User & Account" },
  // Location
  { name: "location",             category: "Location" },
  { name: "location_add",         category: "Location" },
  { name: "location_off",         category: "Location" },
  { name: "map",                  category: "Location" },
  { name: "flag",                 category: "Location" },
  { name: "navigation",           category: "Location" },
  { name: "explore",              category: "Location" },
  { name: "explore_off",          category: "Location" },
  // Selection Controls
  { name: "check_box_checked",        category: "Selection Controls" },
  { name: "check_box_indeterminate",  category: "Selection Controls" },
  { name: "check_box_unchecked",      category: "Selection Controls" },
  { name: "radio_button_checked",     category: "Selection Controls" },
  { name: "radio_button_unchecked",   category: "Selection Controls" },
  { name: "visibility",               category: "Selection Controls" },
  { name: "visibility_off",           category: "Selection Controls" },
  // Social & Rating
  { name: "favorite",             category: "Social & Rating" },
  { name: "favorite_select",      category: "Social & Rating" },
  { name: "star",                 category: "Social & Rating" },
  { name: "star_half",            category: "Social & Rating" },
  { name: "star_select",          category: "Social & Rating" },
  { name: "thumb_up",             category: "Social & Rating" },
  { name: "thumb_down",           category: "Social & Rating" },
  // General
  { name: "alarm",                category: "General" },
  { name: "alarm_off",            category: "General" },
  { name: "calculator",           category: "General" },
  { name: "calendar",             category: "General" },
  { name: "calendar_schedule",    category: "General" },
  { name: "calendar_today",       category: "General" },
  { name: "cart",                 category: "General" },
  { name: "credit_card",          category: "General" },
  { name: "history",              category: "General" },
  { name: "incomplete",           category: "General" },
  { name: "info",                 category: "General" },
  { name: "help",                 category: "General" },
  { name: "language",             category: "General" },
  { name: "qr_code",              category: "General" },
  { name: "settings",             category: "General" },
  { name: "shopping_bag",         category: "General" },
  { name: "time",                 category: "General" },
  { name: "tool",                 category: "General" },
  { name: "update",               category: "General" },
  { name: "update_disabled",      category: "General" },
  { name: "work",                 category: "General" },
  { name: "work_off",             category: "General" },
  { name: "zoom_in",              category: "General" },
  { name: "zoom_out",             category: "General" },
  { name: "sync",                 category: "General" },
  { name: "sync_off",             category: "General" },
  { name: "sync_problem",         category: "General" },
  { name: "3d_rotation",          category: "General" },
];

const ALL_CATEGORIES: IconCategory[] = [
  "Navigation",
  "Action",
  "Communication",
  "Media",
  "Files & Content",
  "Device",
  "User & Account",
  "Location",
  "Selection Controls",
  "Social & Rating",
  "General",
];

// ─── IconCard ─────────────────────────────────────────────────

function IconCard({ name, onCopy }: { name: string; onCopy: (name: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onCopy(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      title={`클릭하여 "${name}" 복사`}
      className="
        group flex flex-col items-center gap-2 p-3
        rounded-lg border border-[var(--color-border)]
        bg-[var(--color-bg-base)]
        hover:border-mint-300 hover:bg-mint-20
        dark:hover:bg-mint-600/10
        transition-all duration-150
        cursor-pointer
      "
    >
      {/* SVG 24dp */}
      <div className="w-6 h-6 flex items-center justify-center">
        {copied ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-mint-400" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/icons/${name}.svg`}
            alt={name}
            width={24}
            height={24}
            className="
              w-6 h-6 opacity-70
              group-hover:opacity-100
              transition-opacity duration-150
              dark:invert
            "
          />
        )}
      </div>

      {/* 파일명 */}
      <span
        className={`
          text-center leading-tight
          text-[10px] font-medium tracking-tight
          transition-colors duration-150
          ${copied
            ? "text-mint-500 dark:text-mint-300"
            : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
          }
        `}
        style={{ wordBreak: "break-all" }}
      >
        {copied ? "복사됨!" : name}
      </span>
    </button>
  );
}

// ─── Page ────────────────────────────────────────────────────

export default function IconographyPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<IconCategory | "All">("All");
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopiedToast(name);
    setTimeout(() => setCopiedToast(null), 2000);
  };

  const filtered = useMemo(() => {
    return ICONS.filter((icon) => {
      const matchesQuery = icon.name
        .toLowerCase()
        .includes(query.toLowerCase().trim());
      const matchesCategory =
        activeCategory === "All" || icon.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  // 카테고리별 그룹핑 (검색 중엔 단일 그룹으로)
  const grouped = useMemo(() => {
    if (query.trim() !== "" || activeCategory !== "All") {
      return { [activeCategory === "All" ? "검색 결과" : activeCategory]: filtered };
    }
    const result: Partial<Record<IconCategory, IconEntry[]>> = {};
    for (const cat of ALL_CATEGORIES) {
      const items = filtered.filter((i) => i.category === cat);
      if (items.length > 0) result[cat] = items;
    }
    return result;
  }, [filtered, query, activeCategory]);

  return (
    <div className="px-8 py-10 max-w-[1080px]">

      {/* 페이지 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">
            Foundation
          </span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">
          Iconography
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          오픈패스 DS 아이콘 라이브러리. 24dp 기준으로 설계됨.
          <br />
          <span className="text-mint-400 font-medium">{ICONS.length}개 아이콘</span> · SVG 포맷 · 클릭 시 이름 복사
        </p>
      </div>

      {/* 검색 + 카테고리 필터 */}
      <div className="mb-8 space-y-4">
        {/* 검색창 */}
        <div className="relative max-w-[400px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="아이콘 이름으로 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full pl-9 pr-4 py-2.5
              rounded-lg border border-[var(--color-border)]
              bg-[var(--color-bg-base)]
              text-[14px] text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-secondary)]
              focus:outline-none focus:border-mint-300
              transition-colors duration-150
            "
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>

        {/* 카테고리 필터 탭 */}
        <div className="flex flex-wrap gap-2">
          {(["All", ...ALL_CATEGORIES] as (IconCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1 rounded-full text-[12px] font-medium
                border transition-all duration-150
                ${activeCategory === cat
                  ? "bg-mint-300 text-white border-mint-300"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400 bg-transparent"
                }
              `}
            >
              {cat === "All" ? `전체 (${ICONS.length})` : `${cat} (${ICONS.filter(i => i.category === cat).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* 아이콘 그리드 */}
      {Object.entries(grouped).length === 0 ? (
        <div className="py-20 text-center text-[var(--color-text-secondary)]">
          <p className="text-[16px]">검색 결과가 없습니다.</p>
          <p className="text-[13px] mt-1">다른 검색어를 시도해 보세요.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, icons]) => (
            <section key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-[16px] font-bold text-[var(--color-text-primary)]">
                  {category}
                </h2>
                <span className="text-[12px] font-medium text-mint-400 bg-mint-20 dark:bg-mint-600/20 px-2 py-0.5 rounded-full">
                  {icons!.length}
                </span>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
                {icons!.map((icon) => (
                  <IconCard key={icon.name} name={icon.name} onCopy={handleCopy} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Toast */}
      {copiedToast && (
        <div className="
          fixed bottom-6 left-1/2 -translate-x-1/2
          bg-neutral-600 text-white
          px-4 py-2 rounded-lg
          text-[13px] font-medium
          shadow-elevation-2
          pointer-events-none
          z-50
          animate-fade-in
        ">
          <span className="text-mint-300 font-semibold">{copiedToast}</span> 복사됨
        </div>
      )}

    </div>
  );
}
