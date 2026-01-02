(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/social-approvals/src/app/portal/profiles/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-approvals/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-approvals/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-approvals/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ProfilesPage = ()=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(37);
    if ($[0] !== "cf8fee4753ccd8aff03cadc0b6b210be236d4ec99167ccba6217835ba42fc884") {
        for(let $i = 0; $i < 37; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cf8fee4753ccd8aff03cadc0b6b210be236d4ec99167ccba6217835ba42fc884";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            {
                id: 1,
                name: "dak.jen",
                avatar: "/avatar-placeholder.png"
            },
            {
                id: 2,
                name: "ben.dashiell",
                avatar: "/avatar-placeholder.png"
            }
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [profiles, setProfiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            name: "",
            avatar: ""
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [newProfile, setNewProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [avatarPreview, setAvatarPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    if ($[3] !== newProfile) {
        t2 = (e)=>{
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = ()=>{
                    setAvatarPreview(reader.result);
                    setNewProfile({
                        ...newProfile,
                        avatar: reader.result
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        $[3] = newProfile;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const handleAvatarChange = t2;
    let t3;
    if ($[5] !== newProfile || $[6] !== profiles) {
        t3 = (e_0)=>{
            e_0.preventDefault();
            if (newProfile.name) {
                setProfiles([
                    ...profiles,
                    {
                        id: profiles.length + 1,
                        ...newProfile,
                        avatar: newProfile.avatar || "/avatar-placeholder.png"
                    }
                ]);
                setNewProfile({
                    name: "",
                    avatar: ""
                });
                setAvatarPreview(null);
            }
        };
        $[5] = newProfile;
        $[6] = profiles;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    const handleAddProfile = t3;
    let t4;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-bold mb-8",
            children: "Profiles Management"
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-bold mb-4",
            children: "Add New Profile"
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 96,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== newProfile) {
        t6 = (e_1)=>setNewProfile({
                ...newProfile,
                name: e_1.target.value
            });
        $[10] = newProfile;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== newProfile.name || $[13] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "Profile Name",
            value: newProfile.name,
            onChange: t6,
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 114,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = newProfile.name;
        $[13] = t6;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== handleAvatarChange) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "file",
            id: "avatar",
            accept: "image/*",
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline",
            onChange: handleAvatarChange
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 123,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[15] = handleAvatarChange;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== avatarPreview) {
        t9 = avatarPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: avatarPreview,
            alt: "Avatar Preview",
            className: "w-10 h-10 rounded-full"
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 131,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0));
        $[17] = avatarPreview;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== t8 || $[20] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 139,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[19] = t8;
        $[20] = t9;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "bg-[#740403] hover:bg-[#d2232a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
            children: "Add Profile"
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 148,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] !== t10 || $[24] !== t7) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4",
            children: [
                t7,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 155,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[23] = t10;
        $[24] = t7;
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[26] !== handleAddProfile || $[27] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-8",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleAddProfile,
                    children: t12
                }, void 0, false, {
                    fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                    lineNumber: 164,
                    columnNumber: 37
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[26] = handleAddProfile;
        $[27] = t12;
        $[28] = t13;
    } else {
        t13 = $[28];
    }
    let t14;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "py-2 px-4 border-b",
                        children: "Avatar"
                    }, void 0, false, {
                        fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                        lineNumber: 173,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "py-2 px-4 border-b",
                        children: "Name"
                    }, void 0, false, {
                        fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                        lineNumber: 173,
                        columnNumber: 68
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                lineNumber: 173,
                columnNumber: 18
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== profiles) {
        t15 = profiles.map(_temp);
        $[30] = profiles;
        $[31] = t15;
    } else {
        t15 = $[31];
    }
    let t16;
    if ($[32] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "min-w-full bg-white",
            children: [
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: t15
                }, void 0, false, {
                    fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                    lineNumber: 188,
                    columnNumber: 55
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 188,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[32] = t15;
        $[33] = t16;
    } else {
        t16 = $[33];
    }
    let t17;
    if ($[34] !== t13 || $[35] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t4,
                t13,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
            lineNumber: 196,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[34] = t13;
        $[35] = t16;
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    return t17;
};
_s(ProfilesPage, "FsitbjXcqa36LCeVyyDpyc28noM=");
_c = ProfilesPage;
const __TURBOPACK__default__export__ = ProfilesPage;
function _temp(profile) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2 px-4 border-b",
                children: profile.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: profile.avatar,
                    alt: "Profile Avatar",
                    className: "w-10 h-10 rounded-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                    lineNumber: 207,
                    columnNumber: 84
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-10 h-10 bg-gray-300 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                    lineNumber: 207,
                    columnNumber: 184
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                lineNumber: 207,
                columnNumber: 31
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$approvals$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2 px-4 border-b",
                children: profile.name
            }, void 0, false, {
                fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
                lineNumber: 207,
                columnNumber: 244
            }, this)
        ]
    }, profile.id, true, {
        fileName: "[project]/social-approvals/src/app/portal/profiles/page.tsx",
        lineNumber: 207,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ProfilesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=social-approvals_src_app_portal_profiles_page_tsx_e21f4139._.js.map