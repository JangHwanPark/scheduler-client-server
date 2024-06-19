
// DeprecationWarning 무시
process.on('warning', (warning) => {
    if (warning.name === 'DeprecationWarning') {
        // DeprecationWarning을 무시합니다.
        return;
    }
    // 다른 종류의 경고는 무시하지 않습니다.
    console.warn(warning);
});