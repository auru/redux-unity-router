import React from 'react';
import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';
import DockMonitor from 'redux-devtools-dock-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';

const Perf = require('react/lib/ReactPerf');
if (typeof window === 'object') window.Perf = Perf;

export default createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        changeMonitorKey="ctrl-m"
    >
        <Inspector />
        <DiffMonitor />
    </DockMonitor>
);