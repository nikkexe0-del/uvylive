import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Signal, ChevronRight, X, Instagram, Send, ExternalLink } from 'lucide-react';
import { fetchChannels, fetchToken, getChannelById, groupByCategory, slugify, Channel } from '../lib/liveChannelsApi';
import ShakaPlayer from '../components/ShakaPlayer';

function PlayerFooter() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 px-4 py-3 bg-zinc-900/80 border-t border-white/5 text-[12px] text-zinc-500">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Instagram size={13} className="text-pink-500 shrink-0" />
          <a
            href="https://instagram.com/nikkk.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 font-bold hover:text-pink-300 transition-colors"
          >
            @nikkk.exe
          </a>
        </div>
        <span className="text-zinc-800">·</span>
        <div className="flex items-center gap-1.5">
          <Send size={13} className="text-sky-500 shrink-0" />
          <a
            href="https://t.me/+0sACDI0bSDI2Njg9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 font-bold hover:text-sky-300 transition-colors"
          >
            Join Telegram
          </a>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span>movies &amp; more →</span>
        <a
          href="https://zestyyflix.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-0.5"
        >
          zestyyflix.vercel.app
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

function IframePlayer({ url, title }: { url: string; title: string }) {
  const [showNotice, setShowNotice] = useState(true);
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={url}
          className="absolute inset-0 w-full h-full border-none"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
          title={title}
        />
        {/* Watermark overlay */}
        <div className="absolute top-3 right-3 z-30 pointer-events-none select-none">
          <span
            className="text-sm font-bold text-white/25 tracking-wide"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
          >
            nikshep uvylive
          </span>
        </div>
        {showNotice && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm rounded-xl border border-zinc-700/60 bg-zinc-900/95 p-3.5 backdrop-blur-xl shadow-2xl flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-400 mb-0.5">Notice</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Use Chrome and avoid clicking inside the player — it contains redirects.
              </p>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="shrink-0 w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
            >
              <X size={11} />
            </button>
          </div>
        )}
      </div>
      <PlayerFooter />
    </div>
  );
}

function ShakaPlayerWithFooter(props: React.ComponentProps<typeof ShakaPlayer>) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
      <ShakaPlayer {...props} />
      <PlayerFooter />
    </div>
  );
}

function JoinPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.75)' }}>
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl overflow-hidden">
        {/* top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-amber-400" />

        <div className="p-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <X size={13} />
          </button>

          {/* Badge */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              Live
            </span>
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-semibold">uvylive</span>
          </div>

          <h2 className="text-lg font-black text-white leading-tight mb-1">Enjoying free Live TV?</h2>
          <p className="text-[12px] text-zinc-400 leading-relaxed mb-6">
            Stay connected — get updates, report issues, and discover more free content.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="https://t.me/+0sACDI0bSDI2Njg9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-[13px] font-bold px-4 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/40"
            >
              <Send size={15} />
              Join Telegram Group
            </a>
            <a
              href="https://zestyyflix.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-amber-400 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink size={13} />
              Movies &amp; More on ZestyyFlix
            </a>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full text-[11px] text-zinc-700 hover:text-zinc-500 transition-colors"
          >
            No thanks, continue watching
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChannelPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    Promise.all([fetchChannels(), fetchToken()])
      .then(([ch, tok]) => { setChannels(ch); setToken(tok); })
      .finally(() => setLoading(false));
  }, []);

  // Show popup 4 seconds after channel loads
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(t);
  }, [loading, id]);

  const channel = id ? getChannelById(channels, id) : undefined;

  // Related channels: same category, exclude current
  const related = channel
    ? channels.filter(c => c.category === channel.category && c.id !== channel.id).slice(0, 16)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <Signal size={40} className="text-zinc-800" />
        <p className="text-zinc-500 text-sm">Channel not found</p>
        <button onClick={() => navigate('/')} className="text-xs text-zinc-600 hover:text-white mt-2 transition-colors">
          ← Back home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {showPopup && <JoinPopup onClose={() => setShowPopup(false)} />}
      {/* Nav */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 px-5 md:px-10 h-14">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-medium">uvylive</span>
          </button>
          <span className="text-zinc-800">/</span>
          <button
            onClick={() => navigate(`/${slugify(channel.category)}`)}
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            {channel.category}
          </button>
          <span className="text-zinc-800">/</span>
          <span className="text-xs text-zinc-300 truncate">{channel.name}</span>
        </div>
      </div>

      <div className="px-5 md:px-10 py-8 max-w-6xl mx-auto">
        {/* Player */}
        <div className="mb-8">
          {(channel.iframeEmbed || channel.category === 'Sports') ? (
            <IframePlayer url={`https://joplay.lrl45.workers.dev/${channel.id.replace('ss-', '')}`} title={channel.name} />
          ) : (
            <ShakaPlayerWithFooter
              key={channel.id}
              url={channel.url}
              clearKeyId={channel.keyId}
              clearKey={channel.key}
              licenseUrl={channel.licenseUrl}
              token={token}
              title={channel.name}
            />
          )}
        </div>

        {/* Channel info */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/8 flex items-center justify-center p-2 shrink-0">
            <img
              src={channel.logo}
              alt=""
              className="w-full h-full object-contain"
              onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{channel.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] text-red-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
              <span className="text-zinc-700">·</span>
              <button
                onClick={() => navigate(`/${slugify(channel.category)}`)}
                className="text-[11px] text-zinc-500 hover:text-white transition-colors flex items-center gap-0.5 group"
              >
                {channel.category}
                <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Related channels */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">More in {channel.category}</h2>
              <button
                onClick={() => navigate(`/${slugify(channel.category)}`)}
                className="text-[11px] text-zinc-600 hover:text-white transition-colors flex items-center gap-0.5 group"
              >
                See all <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
              {related.map(ch => (
                <div
                  key={ch.id}
                  onClick={() => navigate(`/channel/${ch.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video rounded-lg bg-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center hover:border-white/15 hover:scale-[1.04] active:scale-[0.97] transition-all relative">
                    <img
                      src={ch.logo}
                      alt={ch.name}
                      className="w-[70%] h-[70%] object-contain"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <span className="text-white text-[8px] ml-0.5">▶</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-zinc-600 group-hover:text-zinc-400 mt-1 truncate transition-colors">{ch.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
