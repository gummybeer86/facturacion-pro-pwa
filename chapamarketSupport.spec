# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['diagnostic_tool.py'],
    pathex=[],
    binaries=[],
    datas=[('assets', 'assets'), ('templates', 'templates')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='chapamarketSupport',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['build/icon.ico'],
)
app = BUNDLE(
    exe,
    name='chapamarketSupport.app',
    icon='build/icon.ico',
    bundle_identifier=None,
)
