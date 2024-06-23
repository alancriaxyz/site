import Discord from "./social/discord.svelte";
import Youtube from "./social/youtube.svelte";
import Twitter from "./social/twitter.svelte";
import TikTok from "./social/tiktok.svelte";
import Instagram from "./social/instagram.svelte";
import GitHub from "./social/github.svelte";
import Linkedin from "./social/linkedin.svelte";

import ChevronDoubleLeft from './chevron-double-left.svelte'
import ChevronDoubleRight from './chevron-double-right.svelte'

import Sun from "lucide-svelte/icons/sun";
import Moon from "lucide-svelte/icons/moon";

export const Icon = {
    discord: Discord,
    youtube: Youtube,
    twitter: Twitter,
    tiktok: TikTok,
    instagram: Instagram,
    gitHub: GitHub,
    linkedin: Linkedin,
    sun: Sun,
    moon: Moon,
    chevronDoubleLeft: ChevronDoubleLeft,
    chevronDoubleRight: ChevronDoubleRight
};