import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Welcome() {
  return (
    <>
      <Header current="welcome" />
      <main className="w-full pt-20 bg-surface flex-1"><div className="flex flex-col w-full">

<div className="relative w-full overflow-hidden">
<div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-96 -left-20 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none -z-10"></div>

<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-xl pb-space-xl">

<div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
<div className="flex items-center gap-space-sm">
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase bg-secondary-fixed/60 px-space-sm py-space-xs rounded">Universal Access · አጠቃላይ ተደራሽነት</span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Bilingual Assistive Intelligence</span>
</div>
<div className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
          Edition 2025 // Lalibela Edition
        </div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
<div className="lg:col-span-7 flex flex-col space-y-space-md">
<div className="space-y-space-xs">
<span className="font-label-lg text-label-lg text-primary tracking-wide block">መረጃ የሁሉም የሰው ልጅ ሀብት ነው</span>
<h1 className="font-display-lg text-display-lg text-on-surface leading-[1.08] tracking-tight">
              Information belongs to everyone.
            </h1>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-space-xs leading-relaxed">
            Nooraa transforms written documents into resonant natural speech, and spoken voices into high-clarity synchronized captions. Thoughtfully engineered with cultural depth, cognitive serenity, and uncompromised dignity for blind, low-vision, deaf, and hard-of-hearing readers.
          </p>

<div className="pt-space-md flex flex-wrap items-center gap-space-md">
<Link to="/workspace" className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
<span>Get Started</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
<a className="inline-flex items-center gap-space-xs px-space-lg py-space-md text-on-surface hover:text-primary font-label-md text-label-md transition-colors group" href="#capabilities">
<span>Discover how it works</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">south</span>
</a>

<div className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-tertiary text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>volume_up</span>
<span>Audio Synthesis: Ready (Amharic &amp; English)</span>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col">
<div className="relative rounded-xl overflow-hidden bg-surface-container p-space-sm shadow-xl">
<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-highest">
<img alt="Ethiopic calligraphic manuscript flowing with ochre ochre, terracotta watercolors, and sound-wave patterns symbolizing speech and text" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb_auwOalTZBXMq7EbmAQHbaxuK8lFg4NcIboJQrBnifIVRw5qF2M3PjwpohWQtoeZ-02gzE-YLEsLjzkAF_IkXMRmNntpNYgSrlfvCF7IS0de2U53Vw4H_vgQixYhzVgNv3R0Opww_DJlV9n9iY-8kAb3qrdTjRhJXfMlSamUVAD9s9UdqJvCkApE42IdTs0LYQ1NQVaQVv8TZL0xQwH-kTb4B_GecdeKKD463rnW" />
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent"></div>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
<span className="font-label-sm text-label-sm backdrop-blur-md bg-inverse-surface/60 px-space-sm py-space-xs rounded">Artwork: "ድምፅና ጽሑፍ" (Sound &amp; Word)</span>
<span className="material-symbols-outlined text-[18px]">auto_stories</span>
</div>
</div>
<div className="pt-space-sm px-space-xs pb-space-xs flex items-center justify-between">
<p className="font-body-sm text-body-sm text-on-surface-variant italic">
                Bridging oral narrative tradition with modern multimodal access.
              </p>
<span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">WCAG AAA</span>
</div>
</div>
</div>
</div>
</section>

<div className="w-full h-2 bg-gradient-to-r from-primary via-secondary-container to-tertiary opacity-80"></div>
</div>

<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl" id="capabilities">
<div className="mb-space-xl max-w-2xl">
<span className="font-label-md text-label-md text-primary tracking-wider uppercase block mb-space-xs">Core Modalities</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Two fundamental transformations designed for human independence.</h2>
<p className="font-body-md text-body-md text-on-surface-variant pt-space-xs">
        Crafted with deep linguistic models tailored for Ethiopic Fidel scripts and Latin alphabets alike.
      </p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-stretch">

<article className="flex flex-col justify-between bg-surface-container-lowest p-space-xl rounded-xl shadow-md transition-all hover:shadow-xl relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/30 rounded-bl-full pointer-events-none -z-0"></div>
<div className="relative z-10">
<div className="flex items-center justify-between mb-space-md">
<span className="font-headline-sm text-headline-sm text-primary">01 — Document to Speech</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[16px] text-primary">visibility_off</span>
              For low-vision &amp; blind users
            </span>
</div>
<h3 className="font-display-lg text-headline-lg text-on-surface leading-tight mb-space-sm">
            Let your documents speak.
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
            Upload printed pages, academic papers, historical manuscripts, or smartphone photographs. Nooraa parses Ge'ez and Latin typography, reads aloud in organic natural voices, and synchronizes phrasing.
          </p>

<div className="bg-surface-container-low rounded-lg p-space-md space-y-space-md">

<div className="bg-surface-container-lowest p-space-md rounded shadow-sm">
<div className="flex items-center justify-between pb-space-xs text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Document OCR Preview</span>
<span className="font-label-sm text-label-sm text-tertiary">99.4% Confidence</span>
</div>
<p className="font-body-md text-body-md leading-relaxed">
<span>የኢትዮጵያ ታሪክ እና</span>
<mark className="bg-secondary-fixed text-on-secondary-fixed px-1 rounded mx-0.5 font-medium">የተደራሽነት መርሆዎች</mark>
<span>ሁሉንም ዜጎች በዕውቀት ያበለጽጋሉ። Every citizen deserves equal access to the written word.</span>
</p>
</div>

<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>play_arrow</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Narrator: Almaz (Natural Warm)</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">01:24 / 04:15 · Audio Synthesized</span>
</div>
</div>

<div className="flex items-center bg-surface-container rounded-lg p-1 gap-1">
<div className="px-space-sm py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface">0.8x</div>
<div className="px-space-sm py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm">1.0x</div>
<div className="px-space-sm py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface">1.25x</div>
</div>
</div>

<div aria-hidden="true" className="flex items-end gap-1 h-6 w-full pt-1">
<span className="w-1.5 h-3 bg-secondary rounded-full"></span>
<span className="w-1.5 h-5 bg-secondary rounded-full"></span>
<span className="w-1.5 h-6 bg-primary rounded-full"></span>
<span className="w-1.5 h-4 bg-primary rounded-full"></span>
<span className="w-1.5 h-2 bg-secondary rounded-full"></span>
<span className="w-1.5 h-5 bg-secondary rounded-full"></span>
<span className="w-1.5 h-6 bg-primary rounded-full"></span>
<span className="w-1.5 h-3 bg-secondary rounded-full"></span>
<span className="w-1.5 h-2 bg-secondary rounded-full"></span>
<span className="w-1.5 h-5 bg-primary rounded-full"></span>
<span className="w-1.5 h-6 bg-primary rounded-full"></span>
<span className="w-1.5 h-4 bg-secondary rounded-full"></span>
<span className="w-1.5 h-2 bg-secondary-fixed-dim rounded-full"></span>
<span className="w-1.5 h-3 bg-secondary-fixed-dim rounded-full"></span>
<span className="w-1.5 h-1 bg-secondary-fixed-dim rounded-full"></span>
</div>
</div>
</div>
<div className="pt-space-lg relative z-10">
<Link to="/workspace?mode=document" className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors">
<span>Open Document Reader</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</article>

<article className="flex flex-col justify-between bg-surface-container-lowest p-space-xl rounded-xl shadow-md transition-all hover:shadow-xl relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed/30 rounded-bl-full pointer-events-none -z-0"></div>
<div className="relative z-10">
<div className="flex items-center justify-between mb-space-md">
<span className="font-headline-sm text-headline-sm text-tertiary">02 — Speech to Text</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[16px] text-tertiary">hearing_disabled</span>
              For deaf &amp; hard-of-hearing users
            </span>
</div>
<h3 className="font-display-lg text-headline-lg text-on-surface leading-tight mb-space-sm">
            Make every spoken word visible.
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
            Record real-time conversations, import phone memos, or live stream seminars. Nooraa transcribes speech into high-legibility typographic captions with dual-language synchronization and speaker recognition.
          </p>

<div className="bg-surface-container-low rounded-lg p-space-md space-y-space-md">
<div className="flex items-center justify-between text-on-surface-variant">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
<span className="font-label-sm text-label-sm text-error uppercase font-bold tracking-wider">Live Captions Active</span>
</div>
<div className="flex items-center gap-1">
<div className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Increase Caption Size">
<span className="material-symbols-outlined text-[18px]">text_increase</span>
</div>
<div className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Copy Captions">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</div>
</div>
</div>

<div className="bg-inverse-surface text-inverse-on-surface p-space-md rounded-lg space-y-space-xs shadow-inner">
<span className="font-label-sm text-label-sm text-secondary-fixed block">Speaker 01 (Professor Yohannes)</span>
<p className="font-headline-sm text-headline-sm tracking-wide leading-snug">
                "እንኳን ወደዚህ መድረክ በሰላም መጣችሁ።"
              </p>
<p className="font-body-md text-body-md text-inverse-on-surface/80">
                "Welcome warmly to this forum. Today we explore accessible design for everyone."
              </p>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                Latency: 180ms · Offline Neural Model
              </span>
<span className="text-secondary font-medium">Bilingual Amharic + English</span>
</div>
</div>
</div>
<div className="pt-space-lg relative z-10">
<Link to="/workspace?mode=speech" className="inline-flex items-center gap-space-xs font-label-md text-label-md text-tertiary hover:text-tertiary-container font-semibold transition-colors">
<span>Launch Live Transcriber</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</article>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
<div>
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest block mb-space-xs">Simple Choreography</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">How Nooraa functions with minimal friction.</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Engineered for cognitive ease, minimal keystrokes, and frictionless screen-reader tree navigation.
        </p>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl mb-space-md shadow-sm">
<div className="flex items-center gap-space-sm mb-space-md">
<span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold">A</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Document to Speech Flow</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-primary font-bold">STEP 01</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-space-xs">Upload Document</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Drop any PDF, JPEG, or book scan. Tactile drag-and-drop with immediate audio feedback cues.</p>
</div>
<div className="mt-space-md flex items-center text-primary">
<span className="material-symbols-outlined text-[28px]">upload_file</span>
</div>
</div>
<div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-primary font-bold">STEP 02</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-space-xs">Extract &amp; Structure</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Neural OCR separates paragraphs, headers, and Ge'ez symbols into accessible semantic markup.</p>
</div>
<div className="mt-space-md flex items-center text-primary">
<span className="material-symbols-outlined text-[28px]">document_scanner</span>
</div>
</div>
<div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-primary font-bold">STEP 03</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-space-xs">Listen &amp; Save</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">High-fidelity voice synthesis with playback controls, bookmarks, and MP3 audio exports.</p>
</div>
<div className="mt-space-md flex items-center text-primary">
<span className="material-symbols-outlined text-[28px]">graphic_eq</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center gap-space-sm mb-space-md">
<span className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold">B</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Speech to Text Flow</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-tertiary font-bold">STEP 01</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-space-xs">Capture Audio</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tap the oversized tactile microphone or feed recordings from phone or broadcast feeds.</p>
</div>
<div className="mt-space-md flex items-center text-tertiary">
<span className="material-symbols-outlined text-[28px]">mic</span>
</div>
</div>
<div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-tertiary font-bold">STEP 02</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-space-xs">Transcribe Phonemes</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Local acoustic models map multi-dialect phonemes into correct Amharic orthography and English text.</p>
</div>
<div className="mt-space-md flex items-center text-tertiary">
<span className="material-symbols-outlined text-[28px]">translate</span>
</div>
</div>
<div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-tertiary font-bold">STEP 03</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-space-xs">Read &amp; Search</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Real-time synchronized caption display, speaker differentiation, and fully searchable text archives.</p>
</div>
<div className="mt-space-md flex items-center text-tertiary">
<span className="material-symbols-outlined text-[28px]">subtitles</span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
<div className="relative rounded-2xl bg-surface-container-highest p-space-xl overflow-hidden shadow-lg">
<div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-secondary-fixed opacity-50 blur-2xl pointer-events-none"></div>
<div className="relative z-10 max-w-3xl space-y-space-md">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Universal Accessibility · የተደራሽነት ቃል ኪዳን</span>
<h2 className="font-display-lg text-headline-lg text-on-surface leading-tight">
          "Regardless of how you see or hear, no thought should remain beyond your reach."
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Nooraa was built from day one conforming to WCAG 2.2 Level AAA standards, with full keyboard navigability, high color contrast ratios, screen-reader friendly landmark zones, and zero synthetic distractions.
        </p>
<div className="pt-space-sm flex flex-wrap items-center gap-space-md">
<Link to="/workspace" className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
<span>Enter the Workspace</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-tertiary text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
<span>No account required · Private offline computation options</span>
</div>
</div>
</div>
</div>
</section>
</div></main>
      <Footer />
    </>
  )
}
