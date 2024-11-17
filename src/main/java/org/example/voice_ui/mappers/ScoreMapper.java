package org.example.voice_ui.mappers;

import org.example.voice_ui.document.Score;
import org.example.voice_ui.dto.get.GetScoreDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ScoreMapper {
    GetScoreDTO scoreToGetScoreDTO(Score score);
}
