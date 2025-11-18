const BASE_URL = 'https://socialclub.rockstargames.com/member/';
        const STATS_PATH = '/games/gtav/pc/career/overview/gtaonline';

        // 페이지 로드 시 즐겨찾기 불러오기
        window.onload = function() {
            loadFavorites();
        };

        // 통계 페이지 열기
        function openStats() {
            const userId = document.getElementById('userId').value.trim();
            if (userId) {
                const url = BASE_URL + userId + STATS_PATH;
                window.open(url, '_blank');
            } else {
                alert('ID를 입력해주세요!');
            }
        }

        // 즐겨찾기에 추가
        function addToFavorites() {
            const userId = document.getElementById('userId').value.trim();
            if (!userId) {
                alert('ID를 입력해주세요!');
                return;
            }

            let favorites = getFavorites();
            
            // 중복 체크
            if (favorites.includes(userId)) {
                alert('이미 즐겨찾기에 추가된 ID입니다!');
                return;
            }

            favorites.push(userId);
            saveFavorites(favorites);
            loadFavorites();
            
            document.getElementById('userId').value = '';
            alert('즐겨찾기에 추가되었습니다!');
        }

        // 즐겨찾기에서 삭제
        function removeFromFavorites(userId) {
            if (confirm(`'${userId}'를 즐겨찾기에서 삭제하시겠습니까?`)) {
                let favorites = getFavorites();
                favorites = favorites.filter(id => id !== userId);
                saveFavorites(favorites);
                loadFavorites();
            }
        }

        // 즐겨찾기 목록 표시
        function loadFavorites() {
            const favorites = getFavorites();
            const list = document.getElementById('favoritesList');
            
            if (favorites.length === 0) {
                list.innerHTML = '<div class="empty-message">아직 즐겨찾기가 없습니다</div>';
                return;
            }

            list.innerHTML = favorites.map(userId => `
                <li class="favorite-item">
                    <span class="favorite-name" onclick="openStatsById('${userId}')">${userId}</span>
                    <button class="btn-delete" onclick="removeFromFavorites('${userId}')">삭제</button>
                </li>
            `).join('');
        }

        // ID로 통계 열기
        function openStatsById(userId) {
            const url = BASE_URL + userId + STATS_PATH;
            window.open(url, '_blank');
        }

        // 즐겨찾기 가져오기
        function getFavorites() {
            const favs = localStorage.getItem('gta_favorites');
            return favs ? JSON.parse(favs) : [];
        }

        // 즐겨찾기 저장
        function saveFavorites(favorites) {
            localStorage.setItem('gta_favorites', JSON.stringify(favorites));
        }