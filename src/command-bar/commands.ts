/**
 * Command definitions for the command bar
 */

export interface Command {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  action: () => void;
}

export type CommandCategory = 'layout' | 'overflow' | 'search' | 'debug';

export interface CommandGroup {
  category: CommandCategory;
  commands: Command[];
}

export function createCommands(
  handlers: {
    onTightenSpacing: () => void;
    onLoosenSpacing: () => void;
    onReduceBodyFont: () => void;
    onIncreaseBodyFont: () => void;
    onIncreaseSidebarWidth: () => void;
    onDecreaseSidebarWidth: () => void;
    onResetLayout: () => void;
    onToggleBaselineGrid: () => void;
    onShowOverflowDetails: () => void;
    onAutoFit: () => void;
    onSuggestReductions: () => void;
  }
): Command[] {
  return [
    // Layout commands
    {
      id: 'tighten-spacing',
      label: 'Tighten spacing',
      description: 'Reduce spacing between sections and blocks',
      keywords: ['tighten', 'spacing', 'reduce', 'compact'],
      action: handlers.onTightenSpacing,
    },
    {
      id: 'loosen-spacing',
      label: 'Loosen spacing',
      description: 'Increase spacing between sections and blocks',
      keywords: ['loosen', 'spacing', 'increase', 'expand'],
      action: handlers.onLoosenSpacing,
    },
    {
      id: 'reduce-body-font',
      label: 'Reduce body font',
      description: 'Decrease body text font size',
      keywords: ['reduce', 'body', 'font', 'smaller', 'text'],
      action: handlers.onReduceBodyFont,
    },
    {
      id: 'increase-body-font',
      label: 'Increase body font',
      description: 'Increase body text font size',
      keywords: ['increase', 'body', 'font', 'larger', 'text'],
      action: handlers.onIncreaseBodyFont,
    },
    {
      id: 'increase-sidebar-width',
      label: 'Increase sidebar width',
      description: 'Make the sidebar wider',
      keywords: ['increase', 'sidebar', 'width', 'wider'],
      action: handlers.onIncreaseSidebarWidth,
    },
    {
      id: 'decrease-sidebar-width',
      label: 'Decrease sidebar width',
      description: 'Make the sidebar narrower',
      keywords: ['decrease', 'sidebar', 'width', 'narrower'],
      action: handlers.onDecreaseSidebarWidth,
    },
    {
      id: 'reset-layout',
      label: 'Reset layout',
      description: 'Reset all layout adjustments to defaults',
      keywords: ['reset', 'layout', 'default', 'original'],
      action: handlers.onResetLayout,
    },
    {
      id: 'show-baseline-grid',
      label: 'Toggle baseline grid',
      description: 'Show/hide the baseline grid overlay',
      keywords: ['baseline', 'grid', 'toggle', 'show', 'hide'],
      action: handlers.onToggleBaselineGrid,
    },
    
    // Overflow commands
    {
      id: 'show-overflow-details',
      label: 'Show overflow details',
      description: 'Display detailed overflow information',
      keywords: ['overflow', 'details', 'show', 'info'],
      action: handlers.onShowOverflowDetails,
    },
    {
      id: 'auto-fit',
      label: 'Auto-fit to one page',
      description: 'Automatically adjust layout to fit on one page',
      keywords: ['auto', 'fit', 'page', 'adjust'],
      action: handlers.onAutoFit,
    },
    {
      id: 'suggest-reductions',
      label: 'Suggest reductions',
      description: 'Get suggestions for reducing content to fit',
      keywords: ['suggest', 'reductions', 'help', 'advice'],
      action: handlers.onSuggestReductions,
    },
  ];
}

/**
 * Filter commands by search term
 */
export function filterCommands(commands: Command[], searchTerm: string): Command[] {
  if (!searchTerm.trim()) return commands;
  
  const term = searchTerm.toLowerCase();
  return commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(term) ||
      cmd.description.toLowerCase().includes(term) ||
      cmd.keywords.some((kw) => kw.toLowerCase().includes(term))
  );
}

