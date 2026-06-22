import { createIcons, Bot, HelpCircle, Bell, ClipboardList, BookOpen,
  Settings, Radio, Library, Calendar, Layers, GitBranch, Wrench,
  Zap, Menu, Home, ChevronLeft, ChevronRight, Check, CheckCircle,
  Star, Loader, BarChart3, LogOut, Plus, Pencil, Trash2, Filter,
  Users, Mail, Hash, Target, NotebookPen, MessageSquareText, PlusCircle,
  MessageCircle, ThumbsUp, FileText, MapPin, Clipboard, Search,
  Keyboard, Lightbulb, Plug, PartyPopper, Newspaper, BookOpenText,
  ChartBar, Trees, Briefcase, Timer, Microscope, Sparkles, Share2,
  ExternalLink, LayoutGrid, List, ChevronDown, X } from 'lucide';

export function initIcons() {
  createIcons({
    icons: { Bot, HelpCircle, Bell, ClipboardList, BookOpen,
      Settings, Radio, Library, Calendar, Layers, GitBranch, Wrench,
      Zap, Menu, Home, ChevronLeft, ChevronRight, Check, CheckCircle,
      Star, Loader, BarChart3, LogOut, Plus, Pencil, Trash2, Filter,
      Users, Mail, Hash, Target, NotebookPen, MessageSquareText, PlusCircle,
      MessageCircle, ThumbsUp, FileText, MapPin, Clipboard, Search,
      Keyboard, Lightbulb, Plug, PartyPopper, Newspaper, BookOpenText,
      ChartBar, Trees, Briefcase, Timer, Microscope, Sparkles, Share2,
      ExternalLink, LayoutGrid, List, ChevronDown, X }
  });
}

export function icon(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px;"></i>`;
}
